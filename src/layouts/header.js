import React from 'react';

const HeaderLayout = () => {
  return (
    <header className="header-body" id="top">
      <div className="header-brand">
        <img alt="logo" src="/libs/bucksh0t.png" className="brand-avatar" />
        <div>
          <div className="brand-title">bucksh0t</div>
          <div className="brand-subtitle">software architect</div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
