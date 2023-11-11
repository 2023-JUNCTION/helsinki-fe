import TransportBase from './TransportBase';
/* eslint-disable */

class Mission extends TransportBase {
  public constructor() {
    super('');
  }

  // 미션 시작
  public startMission(userId: number, teaseId: number): Promise<ResultResponse> {
    return this.http.post(`/${userId}/mission/${teaseId}`).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }

  // 미션 종료
  public terminateMission(userId: number, teaseId: number): Promise<ResultResponse> {
    return this.http.delete(`/${userId}/mission/${teaseId}`).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }
}

export default new Mission();
