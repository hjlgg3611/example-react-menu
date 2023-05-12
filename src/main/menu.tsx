import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Input, MenuProps, Form } from 'antd';
import styles from '../resource/menu.module.scss';

const { Item } = Form;
const { Header, Content, Sider } = Layout;
const mentList = [
    {
        title: '菜单1',
        children: [
            { title: '子菜单1-1' },
            { title: '子菜单1-2' }
        ]
    },
    {
        title: '菜单2',
        children: [
            { title: '子菜单2-1' },
            { title: '子菜单2-2' }
        ]
    }
];

function formatData(list, isChildren = false, parentKey = '', parentInd = '') {
    return list.reduce((prev, item, index) => {
        index++;
        const { title, children } = item;
        const key = isChildren ? `${parentKey}/child${index}` : `parent${index}`;
        const label = isChildren ? <Link to={`/${parentInd}/${index}`}>{title}</Link> : title;
        const itemNew = { key, label };

        if (Array.isArray(children) && children.length) Object.assign(itemNew, { children: formatData(children, true, key, index) });
        prev.push(itemNew);
        return prev;
    }, []);
}

const menu: FC = () => {
    const [collapsed, $collapsed] = useState(false);
    const [list, $list] = useState(mentList);
    const [input, $input] = useState('');

    const { menuFold, menuConent } = styles;
    const { pathname } = useLocation();
    const arrUrl = pathname.split('/').filter(item => item);
    let routeInd, routeArg, defaultConent;
    if (arrUrl.length === 2) {
        routeInd = +arrUrl[0];
        routeArg = +arrUrl[1];
        defaultConent = mentList[routeInd - 1]?.children[routeArg - 1]?.title;
    }

    const toggleCollapsed = () => $collapsed(!collapsed);
    const changeVal = ({ target: { value } }) => $input(value);
    const changeMenu = () => {
        if (!input.trim().length) {
            alert('不能为空');
            return;
        }
        const listNew = list.slice();
        listNew[routeInd - 1].children[routeArg - 1].title = input;
        $list(listNew);
        $input('');
    }
    const propsMenu: MenuProps = {
        mode: 'inline',
        theme: 'dark',
        items: formatData(list),
        defaultOpenKeys: ['parent1']
    }

    return (
        <Layout style={{ height: '100%' }}>
            <Header />
            <Layout>
                <Sider width={300} trigger={null} collapsible collapsed={collapsed}>
                    <span className={menuFold} onClick={toggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
                    <Menu {...propsMenu} />
                </Sider>
                <Layout>
                    <Content className={menuConent}>
                        {defaultConent || 'content'}
                        {defaultConent &&
                            <Form layout="inline">
                                <Item><Input value={input} onChange={changeVal} /></Item>
                                <Item><Button type="primary" onClick={changeMenu}>更新二级导航</Button></Item>
                            </Form>
                        }
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
export default menu;