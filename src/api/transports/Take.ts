import TransportBase from './TransportBase';
/* eslint-disable */

class Take extends TransportBase {
  public constructor() {
    super('take');
  }

  // [데모용] 유저가 npc 하나 선택해서 Take 요청
  public startTake(request: TakeRequest): Promise<ResultResponse> {
    return this.http.post('', request).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }

  // [데모용] 유저가 npc 하나 선택해서 Take 완료 (만나서 하이파이브🖐)
  public terminateTake(request: TakeRequest): Promise<ResultResponse> {
    return this.http.delete('', {data: request}).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }
}

export default new Take();
