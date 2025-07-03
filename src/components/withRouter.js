// src/withRouter.js
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return <Component {...props} router={{ navigate, location, params }} />;
  }

  return ComponentWithRouterProp;
};

export default withRouter;
