import { All, Controller, Inject, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import CM from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: CM,
  ) {}

  @All('*')
  async starHandler(@Req() req): Promise<AxiosResponse<any, any>> {
    const { originalUrl, method } = req;

    const key = originalUrl + method;

    const isCached = await this.cacheManager.get(key);

    if (isCached) {
      return isCached;
    } else {
      const res = await this.httpService.axiosRef[method.toLowerCase()](
        'https://swapi.dev/api' + originalUrl,
      );

      if (res?.data?.status === 'error') {
        throw new Error(res?.data?.data?.message ?? res?.data?.message);
      }

      await this.cacheManager.set(key, res.data, 1000);

      return res.data as AxiosResponse;
    }
  }
}
