import React from 'react';
import {
  AntDesignOutlined,
  AppstoreOutlined,
  CommentOutlined,
  PushpinOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Card, Col, Layout, Menu, Row, Segmented, Select, type MenuProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import './home.css';
import type { SegmentedLabeledOption } from 'antd/es/segmented';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <AppstoreOutlined />, label: 'Inicio' },
  { key: '2', icon: <CommentOutlined />, label: 'Mensajes' },
  { key: '3', icon: <PushpinOutlined />, label: 'Publicacion' },
  { key: '4', icon: <UserOutlined />, label: 'Mi Perfil' },
  { key: '5', icon: <SettingOutlined />, label: 'Ajustes' },
];

const options: SegmentedLabeledOption<number>[] = [
  { 
    label: "Para ti",
    value: 1
  },
  { 
    label: "Siguiendo",
    value: 2
  },
]

const Home: React.FC = () => {
  const soyEmprendedor = false;


  return (
    <>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={true}
            items={items}
          />
        <Layout style={{ backgroundColor: 'var(--primary-color)', borderLeft: '1px solid var(--secondary-color)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 191}}>
          <Content style={{ border: 'none', backgroundColor: 'var(--primary-color)' }}>
            <Row>
              <Segmented
              defaultValue={1}
              size='large'
              className='custom-segmented'
              options={options}
              ></Segmented>
            </Row>
          </Content>
          <Content className='content-publicacion' hidden={soyEmprendedor}>
            <Card className='custom-card'>
              <Card.Meta
                className='custom-card-meta'
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                title="Problematica Ejemplo"
                description='descripcion de la problematica ejemplo'
              />
            </Card>
            <Card className='custom-card'>
              <Card.Meta
                className='custom-card-meta'
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                title="Problematica Ejemplo"
                description='descripcion de la problematica ejemplo'
              />
            </Card>
            <Card className='custom-card'>
              <Card.Meta
                className='custom-card-meta'
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                title="Problematica Ejemplo"
                description='descripcion de la problematica ejemplo'
              />
            </Card>
            <Card className='custom-card'>
              <Card.Meta
                className='custom-card-meta'
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                title="Problematica Ejemplo"
                description='descripcion de la problematica ejemplo'
              />
            </Card>
          </Content>
        </Layout>
        <Layout style={{ maxWidth: 400, backgroundColor: 'var(--primary-color)', borderLeft: '1px solid var(--secondary-color)' }}>
          <Select
            className='custom-select'
            style={{ width: '95%', margin: '16px', backgroundColor: 'black', color: 'white' }} 
            // suffixIcon={<SearchOutlined/>}
            placeholder="Buscar..."
            showSearch={true}
          ></Select>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;