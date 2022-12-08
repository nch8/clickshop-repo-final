import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import User from "./user";
import Header from "./header";
import '../assets/listuser.css'
const Listuser= () =>{
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <User key={'user'+user.id} nombre={user.firstName} mail={user.email}></User>
        
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
      <>
          <Header></Header>  
          <div className="container" style={{marginTop:"4rem"}}>
              <div className="input-group input-group-custom">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" className="btn btn-outline-dark">search</button>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                      <div className="main-box clearfix">
                          <div className="table-responsive">
                              <table className="table user-list">
                                  <thead>
                                      <tr>
                                          <th><span>User</span></th>
                                          <th><span>Created</span></th>
                                          <th className="text-center"><span>Status</span></th>
                                          <th><span>Email</span></th>
                                          <th>&nbsp;</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {displayUsers}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div>
              <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
              />
          </div>
      </>
  );
}

export default Listuser;