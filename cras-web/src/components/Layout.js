import Header from "./Header/Header";

function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

export default Layout;