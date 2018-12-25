import HTTPRequest from './baseService';
class userInformation extends HTTPRequest {
  fetchAllUserData() {
    super.url = '/users';
    return super.connect();
  }
}

export default userInformation;
