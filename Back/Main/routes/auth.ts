import express from 'express'
import bcrypt from 'bcrypt'
import User from '../schemas/user.ts'
import type { IUserLogin, IUserSingUp } from '../schemas/user.ts'
import generateUserToken from '../utils/generate-user-and-token.ts'
import type { RequestWithBody } from '../models/generic-request.ts'
import { Roles } from '../enums/roles.ts'
import Empresa from '../schemas/empresa.ts'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.post('/', createUserToken)

async function createUserToken(req: RequestWithBody<IUserLogin>, res: any, next: any) {
  console.log(`Creating user token for ${req.body.email}`)

  if (!req.body.email) {
    console.error('Missing email parameter. Sending 400 to client')
    return res.status(400).end()
  }

  if (!req.body.password) {
    console.error('Missing password parameter. Sending 400 to client')
    return res.status(400).end()
  }

  try {
    const user = await User.findOne({ email: req.body.email }, '+password')

    if (!user) {
      console.error('User not found. Sending 404 to client')
      return res.status(401).end()
    }

    console.log('Checking user password')
    const result = await user.checkPassword(req.body.password)

    if (result.isLocked) {
      console.error('User is locked. Sending 400 (Locked) to client')
      return res.status(400).end()
    }

    if (!result.isOk) {
      console.error('User password is invalid. Sending 401 to client')
      return res.status(401).end()
    }

    const userLogin: IUserLogin = {
      email: req.body.email,
      password: req.body.password,
    }

    const response = await generateUserToken(userLogin, user)

    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}

router.post('/sing-up', singUp)

async function singUp(req: RequestWithBody<IUserSingUp>, res: any, next: any) {
  const command = req.body;

  ValidarCommandSingUp(command);

  let user = await User.findOne({
    $or: [{ email: command.email }, { userName: command.nombreUsuario }],
  });

  if (user) {
    throw new Error('Ya existe un usuario con ese nombre o email');
  };

  const cryptedPassword = await bcrypt.hash(command.contraseña!, 10);

  user = new User({
    email: command.email,
    password: cryptedPassword,
    userName: command.nombreUsuario!,
    estado: true,
    fechaAlta: new Date(),
    role: new ObjectId(Roles.normalUser),
  });

  if (command.esEmpresa) {
    ValidarCommandSingUpForEmpresa(command);

    const cuitFormateado = Number(command.cuitEmpresa).ToCuitConGuiones();

    let empresa = await Empresa.findOne({
      cuit: cuitFormateado,
    });

    if (empresa) {
      throw new Error('Ya existe una empresa con ese cuit')
    };

    empresa = new Empresa({
      cuit: cuitFormateado,
      fechaFundacion: command.fechaFundacion,
      name: command.nombreEmpresa,
      sector: new ObjectId(command.sector),
      user: user._id,
    });

    user.role = new ObjectId(Roles.empresa);
    await user.save();
    await empresa.save();
    res.status(201).send();
  }
  user.save();
  res.status(201).send();
}

function ValidarCommandSingUp(command: IUserSingUp) {
  if (!command.nombreUsuario) {
    throw new Error('Se necesita un nombre de usuario para registrarse')
  }

  if (!command.email) {
    throw new Error('Se necesita un email para registrarse')
  }

  if (
    !command.contraseña ||
    !command.confirmContraseña ||
    command.confirmContraseña !== command.contraseña
  ) {
    throw new Error('Alguno de los campos de su contraseña estan incorrectos')
  }
}

function ValidarCommandSingUpForEmpresa(command: IUserSingUp) {
  if (!command.nombreEmpresa) {
    throw new Error('Se necesita un nombre de empresa para registrarse como tal')
  }

  if (!command.cuitEmpresa) {
    throw new Error('Se necesita un cuit para registrarse como empresa')
  }

  if (!command.fechaFundacion) {
    throw new Error('Se necesita una fecha de fundacion para registrarse como empresa')
  }

  if (!command.sector) {
    throw new Error('Se necesita un sector para registrarse como empresa')
  }
}

export default router
