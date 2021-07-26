import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { TagType } from '../tag-types/entities/tag-type.entity';
export default class CreateTagTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // const types = [
    //   { name: 'Category' },
    //   { name: 'System' },
    //   { name: 'Topics' },
    //   { name: 'People' },
    //   { name: 'Organization' },
    //   { name: 'Business' },
    //   { name: 'Place' },
    //   { name: 'Location' },
    //   { name: 'Event' },
    // ];
    // const typeRepository = connection.getRepository(TagTypesEntity);

    // // console.log(typeRepository);
    // types.forEach(async (type) => {
    //   const tagType = new TagTypesEntity();
    //   tagType.name = type.name;
    //   const resp = await typeRepository.save(tagType);
    //   console.log(resp);
    // });
    await connection
      .createQueryBuilder()
      .insert()
      .into('tag_types')
      .values([
        { name: 'Category' },
        { name: 'System' },
        { name: 'Topics' },
        { name: 'People' },
        { name: 'Organization' },
        { name: 'Business' },
        { name: 'Place' },
        { name: 'Location' },
        { name: 'Event' },
      ])
      .execute();
  }
}
