import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        getUsers()
    }, [page, keyword])

    const getUsers = async () => {
        const res = await axios.get(`http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`)
        setUsers(res.data.result)
        setPage(res.data.page)
        setPages(res.data.totalPage)
        setRows(res.data.totalRows)
    }

    const changePage = ({ selected }) => {
        setPage(selected)
        if (selected === 9) {
            setMsg('Jikat tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci yang lebih spesifik!')
        }
        else {
            setMsg('')
        }
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setKeyword(query)
    }

    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-centered">
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Find something here..." value={query} onChange={(e) => setQuery(e.target.value)} />
                            </div>
                            <div className="control">
                                <button type='submit' className="button is-info">Search</button>
                            </div>
                        </div>
                    </form>
                    <table className='table is-striped is-bordered is-fullwidth mt-2'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}</p>
                    <p className='has-text-centered has-text-danger'>{msg}</p>
                    <nav className="pagination is-centered " role='navigation' aria-label='pagination' key={rows}>
                        <ReactPaginate
                            previousLabel={'< Prev'}
                            nextLabel={'Next >'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.min(10, pages)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={changePage}
                            containerClassName={'pagination-list'}
                            pageLinkClassName={'pagination-link'}
                            previousLinkClassName={'pagination-previous'}
                            nextLinkClassName={'pagination-next'}
                            activeLinkClassName={'pagination-link is-current'}
                            disabledLinkClassName={'pagination-link is-disabled'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default UserList