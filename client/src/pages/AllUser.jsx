import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DateFormatter from '../hooks/dateFormater';
import { toast } from 'react-toastify';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    async function fetchAllUser() {
      const fetchedData = await fetchUsers(currentPage);
      setUsers(fetchedData?.users);
      setTotalPages(fetchedData?.totalPages);
    }

    fetchAllUser();
  }, [currentPage]);

  const fetchUsers = async (currentPage) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/user/get-all-user?page=${currentPage}`
      );

      if (response.status === 200) {
        return response.data.data || [];
      } else {
        console.error('Failed to fetch users:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if (!error?.response) {
        toast.error('No Server Response');
      } else if (error.response?.status === 500) {
        toast.error('Internal Server Error');
      } else {
        toast.error('Fail to create user');
      }
      return [];
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterUsersByDateOfBirth = () => {
    const filteredUsers = users.filter((user) => {
      const userDateOfBirth = new Date(user.dateOfBirth);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return userDateOfBirth >= start && userDateOfBirth <= end;
      } else if (start) {
        return userDateOfBirth >= start;
      } else if (end) {
        return userDateOfBirth <= end;
      } else {
        return true;
      }
    });

    return filteredUsers;
  };

  const handleFilterChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else if (type === 'end') {
      setEndDate(value);
    }
  };

  return (
    <div className="py-24 px-16">
      {!users && !users?.length ? (
        <div className="flex items-center justify-center">
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-6 h-6 mr-3 text-primary animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </div>
      ) : (
        <div className="mt-4 col-span-full xl:col-span-8 shadow-lg rounded-sm border border-slate-200">
          <header className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold">All Users</h2>
            <div className="">
              <h2 className="font-semibold">Filter user by DOB:</h2>
              <div className="flex space-x-2">
                <div className="flex flex-col">
                  Start:
                  <input
                    type="date"
                    className="text-black"
                    value={startDate}
                    onChange={(e) =>
                      handleFilterChange('start', e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  End:
                  <input
                    type="date"
                    className="text-black"
                    value={endDate}
                    onChange={(e) => handleFilterChange('end', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 bg-slate-50 dark:bg-dark rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">first name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">last name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">phone Num</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">email</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        date of birth
                      </div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium">
                  {filterUsersByDateOfBirth().map((user) => (
                    <tr key={user._id} className="border dark:border-gray-700">
                      <td className="p-4">
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://firebasestorage.googleapis.com/v0/b/my-fx-journal.appspot.com/o/profile_pics%2Fuser.png?alt=media&token=c84db62b-2121-4a83-84d6-556df587fba1"
                            alt={user?.firstName}
                          />
                          <div className="ps-3" />
                          <div
                            className="shrink-0 mr-2 sm:mr-3"
                            width="36"
                            height="36"
                          >
                            {user?.firstName}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-center">{user?.lastName}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{user?.phoneNum}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{user?.email}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {DateFormatter(user?.dateOfBirth)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-center my-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 p-2 border ${
                  currentPage === index + 1 ? 'bg-gray-200 dark:text-dark' : ''
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
