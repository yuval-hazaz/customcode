import { PrismaService } from "nestjs-prisma";
import {
  FindOneCityArgs,
  FindManyCityArgs,
  CityCreateArgs,
  CityUpdateArgs,
  CityDeleteArgs,
  Subset,
} from "@prisma/client";

export class CityServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyCityArgs>(args: Subset<T, FindManyCityArgs>) {
    return this.prisma.city.findMany(args);
  }
  findOne<T extends FindOneCityArgs>(args: Subset<T, FindOneCityArgs>) {
    return this.prisma.city.findOne(args);
  }
  create<T extends CityCreateArgs>(args: Subset<T, CityCreateArgs>) {
    return this.prisma.city.create<T>(args);
  }
  update<T extends CityUpdateArgs>(args: Subset<T, CityUpdateArgs>) {
    return this.prisma.city.update<T>(args);
  }
  delete<T extends CityDeleteArgs>(args: Subset<T, CityDeleteArgs>) {
    return this.prisma.city.delete(args);
  }
}
