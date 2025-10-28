import {
    GithubOutlined,
    InstagramOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { Space, theme } from 'antd';
import type { CSSProperties } from 'react';
import React from 'react';
import './Login.css'
import { login } from './service/login.service';


export const Login:React.FC = () => {
  const { token } = theme.useToken();

  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: 'var(--text-color)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: 'var(--primary-color)', color: 'var(--text-color)', borderRadius: 50 }}>
        <LoginForm
          logo="https://github.githubassets.com/favicons/favicon.png"
          title="Ayudame"
        onFinish={login}
          submitter={{
            searchConfig: {
                submitText: 'Iniciar Sesion'
            },
          }}
          actions={
            <Space>
                Redes
              <GithubOutlined style={iconStyles} onClick={() => window.open('https://github.com/santiLongo')}/>
              <InstagramOutlined style={iconStyles} onClick={() => window.open('https://www.instagram.com/_longosantiago_')}/>
            </Space>
          }
          style={{borderRadius: 50}}
        >
          <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'Email'}
                rules={[
                  {
                    required: true,
                    message: 'Email required',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'La contraseña debe contener números, letras y caracteres especiales, de al menos 8 caracteres de longitud.',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          Fuerza: Media
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          Fuerza: fuerte
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>Fuerza: débil</div>
                    );
                  },
                }}
                placeholder={'Password'}
                rules={[
                  {
                    required: true,
                    message: 'Password required',
                  },
                ]}
              />
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <a
              style={{
                float: 'right',
                marginBottom: 10
              }}
            >
              Registrarse
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};