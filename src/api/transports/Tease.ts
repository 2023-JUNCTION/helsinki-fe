import TransportBase from './TransportBase';
/* eslint-disable */

class Tease extends TransportBase {
  public constructor() {
    super('tease');
  }

  // [데모용] 유저가 npc 하나 선택해서 Tease 요청
  public startTease(request: TeaseRequest): Promise<ResultResponse> {
    return this.http.post('', request).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }

  // 특정 Tease 삭제 (Tease가 만료되거나 유저가 직접 취소하거나..)
  public terminateTease(teaseId: string): Promise<ResultResponse> {
    return this.http.delete(`/${teaseId}`).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }
}

export default new Tease();
