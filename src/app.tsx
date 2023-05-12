import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { ConfigProvider } from 'antd';

import Menu from './main/menu';
import zhCN from 'antd/locale/zh_CN';

import './resource/common';
import 'antd/dist/reset.css';

const root = document.getElementById('root') as HTMLElement;
createRoot(root).render(<ConfigProvider locale={zhCN}><BrowserRouter><Menu /></BrowserRouter></ConfigProvider>);