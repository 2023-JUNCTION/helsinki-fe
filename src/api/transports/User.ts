import TransportBase from './TransportBase';
/* eslint-disable */

class User extends TransportBase {
  public constructor() {
    super('user');
  }
  // 첫 진입 (게스트 생성)
  public createUser(): Promise<CreateUserResponse> {
    return this.http.post('').then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }

  // 맵에서 유저 상태 확인 및 업데이트 폴링
  public updateUserStatus(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    return this.http.post('/status', request).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }
}

export default new User();
