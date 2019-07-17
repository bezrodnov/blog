import { GET_USER, FETCHED_USER, generateAction } from '.';

export const getUser = () => generateAction(GET_USER);
export const fetchedUser = user => generateAction(FETCHED_USER, user);

export default { getUser, fetchedUser };