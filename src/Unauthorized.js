import React from 'react';
import { Link } from 'react-router-dom';
import '../src/styles/unauthorized.css';

const Unauthorized = () => {
  return (
    <div className='container'>
      <div class="gandalf">
        <div class="fireball"></div>
        <div class="skirt"></div>
        <div class="sleeves"></div>
        <div class="shoulders">
          <div class="hand left"></div>
          <div class="hand right"></div>
        </div>
        <div class="head">
          <div class="hair"></div>
          <div class="beard"></div>
        </div>
      </div>
      <div class="message">
        <h1>403 - Bạn không có quyền truy cập</h1>
        <p>Mau trở về nhà đi</p>
      </div>
      <p><Link to='/'>Trở về trang chủ</Link></p>
    </div>
  )
}

export default Unauthorized;