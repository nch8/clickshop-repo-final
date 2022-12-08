const User = ({nombre,mail}) =>{

    return (
      <>
            <tr>
                <td>
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></img>
                    <a href="#" className="user-link">{nombre}</a>
                    <span className="user-subhead">Admin</span>
                </td>
                <td>
                    2013/08/08
                </td>
                <td className="text-center">
                    <span className="label label-default">Inactive</span>
                </td>
                <td>
                    <a href="#">{mail}</a>
                </td>
                <td style={{width:" 20%"}}>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt=""></img>
                    <a href="#" className="user-link">George Clooney</a>
                    <span className="user-subhead">Member</span>
                </td>
                <td>
                    2013/08/12
                </td>
                <td className="text-center">
                    <span className="label label-success">Active</span>
                </td>
                <td>
                    <a href="#">marlon@brando.com</a>
                </td>
                <td style={{width:" 20%"}}>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""></img>
                    <a href="#" className="user-link">Ryan Gossling</a>
                    <span className="user-subhead">Registered</span>
                </td>
                <td>
                    2013/03/03
                </td>
                <td className="text-center">
                    <span className="label label-danger">Banned</span>
                </td>
                <td>
                    <a href="#">jack@nicholson</a>
                </td>
                <td style={{width:" 20%"}}>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt=""></img>
                    <a href="#" className="user-link">Emma Watson</a>
                    <span className="user-subhead">Registered</span>
                </td>
                <td>
                    2004/01/24
                </td>
                <td className="text-center">
                    <span className="label label-warning">Pending</span>
                </td>
                <td>
                    <a href="#">humphrey@bogart.com</a>
                </td>
                <td style={{width:" 20%"}}>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                    <a href="#" className="table-link danger">
                        <span className="fa-stack">
                            <i className="fa fa-square fa-stack-2x"></i>
                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                        </span>
                    </a>
                </td>
            </tr>
      </>
      );
}

export default User;
