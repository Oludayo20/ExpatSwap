import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Helmet from '../components/Helmet';

const EML_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const UserData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNum: '',
  password: '',
  dateOfBirth: ''
};

const CreateUser = () => {
  const firstNameRef = useRef();

  const [userData, setUserData] = useState(UserData);
  const [isLoading, setIsLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EML_REGEX.test(userData.email));
  }, [userData.email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(userData.password));
  }, [userData.password]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const navigate = useNavigate();

  const canSave =
    [
      userData.firstName,
      userData.lastName,
      userData.phoneNum,
      userData.email,
      userData.password,
      userData.dateOfBirth
    ].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (canSave) {
      try {
        console.log(userData);
        const { data } = await axios.post(
          'http://localhost:4000/api/v1/user/create-user',
          userData
        );
        setIsLoading(false);
        setUserData(UserData);
        toast.success(data?.message);
        // navigate('/all-user');
      } catch (error) {
        setIsLoading(false);
        if (!error?.response) {
          toast.error('No Server Response');
        } else if (error.response?.status === 404) {
          toast.error('All field is required');
        } else if (error.response?.status === 409) {
          toast.error('Email Taken');
        } else {
          toast.error('Fail to create user');
        }
      }
    }
  };

  const content = (
    <Helmet title="Create User">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="px-6 py-8 rounded shadow-md w-full">
            <h1 className="mb-8 text-3xl text-center">Create User</h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div>
                  <label htmlFor="first name">First name:</label>
                  <input
                    type="text"
                    className="dark:text-black block border border-grey-light w-full p-3 rounded mb-2 focus:ring-0 focus:border-primary"
                    name="firstName"
                    placeholder="First name"
                    ref={firstNameRef}
                    value={userData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="first name">Last name:</label>
                  <input
                    type="text"
                    className="dark:text-black block border border-grey-light w-full p-3 rounded mb-2 focus:ring-0 focus:border-primary"
                    name="lastName"
                    placeholder="Last name"
                    value={userData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNum">Phone Number:</label>
                  <input
                    type="tel"
                    className="dark:text-black block border border-grey-light w-full p-3 rounded mb-2 mt-1 focus:ring-0 focus:border-primary"
                    name="phoneNum"
                    placeholder="Phone Num"
                    value={userData.phoneNum}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="flex">
                    Email:
                    {validEmail ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-green-500"
                        width="24"
                        height="24"
                        viewBox="0 0 14 14"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M13.637 1.198a1 1 0 0 1 .134 1.408l-8.04 9.73l-.003.002a1.922 1.922 0 0 1-1.5.693a1.923 1.923 0 0 1-1.499-.748l-.001-.002L.21 9.045a1 1 0 1 1 1.578-1.228l2.464 3.167l7.976-9.652a1 1 0 0 1 1.408-.134Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-red-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M17.414 6.586a2 2 0 0 0-2.828 0L12 9.172L9.414 6.586a2 2 0 1 0-2.828 2.828L9.171 12l-2.585 2.586a2 2 0 1 0 2.828 2.828L12 14.828l2.586 2.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 0 0 0-2.828L14.829 12l2.585-2.586a2 2 0 0 0 0-2.828"
                        />
                      </svg>
                    )}
                  </label>
                  <input
                    type="text"
                    className="dark:text-black block border border-grey-light w-full p-3 rounded mb-2 mt-1 focus:ring-0 focus:border-primary"
                    name="email"
                    placeholder="Email"
                    autoComplete="on"
                    value={userData.email}
                    onChange={handleChange}
                    aria-invalid={validEmail ? 'false' : 'true'}
                    aria-describedby="emailNote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    required
                  />
                  <p
                    id="emailNote"
                    className={`${
                      emailFocus && !validEmail ? '' : 'hidden'
                    } bg-gray-300 p-2 rounded dark:text-dark`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.99 12.99 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296c-44.096 0-108.992 44.736-148.48 101.504c0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04c67.84 0 107.904-43.648 147.456-100.416z"
                      />
                    </svg>
                    Not a valid email. try inputting a valid one
                  </p>
                </div>
                <div>
                  <label htmlFor="password" className="flex">
                    Password:
                    {validPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-green-500"
                        width="24"
                        height="24"
                        viewBox="0 0 14 14"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M13.637 1.198a1 1 0 0 1 .134 1.408l-8.04 9.73l-.003.002a1.922 1.922 0 0 1-1.5.693a1.923 1.923 0 0 1-1.499-.748l-.001-.002L.21 9.045a1 1 0 1 1 1.578-1.228l2.464 3.167l7.976-9.652a1 1 0 0 1 1.408-.134Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-red-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M17.414 6.586a2 2 0 0 0-2.828 0L12 9.172L9.414 6.586a2 2 0 1 0-2.828 2.828L9.171 12l-2.585 2.586a2 2 0 1 0 2.828 2.828L12 14.828l2.586 2.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 0 0 0-2.828L14.829 12l2.585-2.586a2 2 0 0 0 0-2.828"
                        />
                      </svg>
                    )}
                  </label>
                  <input
                    type="password"
                    className="dark:text-black block border border-grey-light w-full p-3 rounded mb-2 mt-1 focus:ring-0 focus:border-primary"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    aria-invalid={validPassword ? 'false' : 'true'}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    required
                  />
                  <p
                    id="pwdnote"
                    className={`${
                      pwdFocus && !validPassword ? '' : 'hidden'
                    } bg-gray-300 p-2 rounded dark:text-dark`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.99 12.99 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296c-44.096 0-108.992 44.736-148.48 101.504c0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04c67.84 0 107.904-43.648 147.456-100.416z"
                      />
                    </svg>
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{' '}
                    <span aria-label="exclamation mark">!</span>{' '}
                    <span aria-label="at symbol">@</span>{' '}
                    <span aria-label="hashtag">#</span>{' '}
                    <span aria-label="dollar sign">$</span>{' '}
                    <span aria-label="percent">%</span>
                  </p>
                </div>

                <div>
                  <label htmlFor="dateOfBirth">Date Of Birth:</label>
                  <input
                    type="date"
                    className="dark:text-black block border border-grey-light w-full p-3 rounded mb-2 mt-1 focus:ring-0 focus:border-primary"
                    name="dateOfBirth"
                    placeholder="dateOfBirth"
                    value={userData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full text-center text-white py-3 rounded bg-primary hover:bg-primary focus:outline-none my-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
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
                      </>
                    ) : (
                      'Create User'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );

  return content;
};
export default CreateUser;
