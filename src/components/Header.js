import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
  const [inMenuHeader, setMenuHeader] = React.useState(false);

  function handleMenu() {
    setMenuHeader(!inMenuHeader)
  }
  function handleSignOut(e) {
    e.preventDefault();
    setMenuHeader(false);
    props.onSignOut();
  }
  return (
    <header className={inMenuHeader ? 'header header_reverse' : 'header'}>
      <div className="header__logo">
        {props.loggedIn === true && 
          (
          <button className={inMenuHeader ? 'header__button-menu header__button-menu_opened' :
            'header__button-menu'} type="checkbox" onClick={handleMenu}></button>
          )
        }
      </div>
      <div className={props.loggedIn ? (inMenuHeader ? 'header__container-opened' :
        'header__container header__container-mobile') : 'header__container'}>
        <Switch>
          <Route path="/sign-in">
            <Link className="header__navlink" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link className="header__navlink" to="/sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/">
            <p className={inMenuHeader ? 'header__user header__user_menu-opened' : 
              'header__user'}>{props.userEmail}</p>
            <button className={inMenuHeader ? 'header__navlink header__navlink_menu-opened header__navlink_signout' : 
              'header__navlink header__navlink_signout'} type="submit" onClick={handleSignOut}>
              Выйти
            </button>       
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
