import { HttpRequest } from '@angular/common/http';

import { RequestedWithHeaderInterceptor } from './requested-with-header.interceptor';

fdescribe('the RequestedWithHeader interceptor', () => {
  let interceptor;

  beforeEach(() => {
    interceptor = new RequestedWithHeaderInterceptor();
  });

  it('adds the X-Requested-With header to the request', () => {
    let modifiedRequest;
    const fakeRequest = new HttpRequest('GET', 'fakeUrl');
    const fakeNext = {
      handle: jasmine.createSpy('handleSpy').and.callFake(request => {
        modifiedRequest = request;
      })
    };

    interceptor.intercept(fakeRequest, fakeNext);

    expect(fakeNext.handle).toHaveBeenCalled();
    expect(modifiedRequest.headers.has('X-Requested-With')).toEqual(true);
    expect(modifiedRequest.headers.get('X-Requested-With')).toEqual('Angular woot!');
  });

});
