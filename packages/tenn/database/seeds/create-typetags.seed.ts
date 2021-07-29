import { Connection, getConnectionOptions } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { TagType } from '../../tag-types/entities/tag-type.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const tagType1 = new TagType();
    tagType1.name = 'Category';
    tagType1.slug = 'category';
    const repo1 = connection.getRepository(TagType);
    await repo1.save(tagType1);

    const tagType2 = new TagType();
    tagType2.name = 'System';
    tagType2.slug = 'system';
    const repo2 = connection.getRepository(TagType);
    await repo2.save(tagType2);

    const tagType3 = new TagType();
    tagType3.name = 'Topics';
    tagType3.slug = 'topic';
    const repo3 = connection.getRepository(TagType);
    await repo3.save(tagType3);

    const tagType4 = new TagType();
    tagType4.name = 'People';
    tagType4.slug = 'people';
    const repo4 = connection.getRepository(TagType);
    await repo4.save(tagType4);

    const tagType5 = new TagType();
    tagType5.name = 'Organization';
    tagType5.slug = 'organization';
    const repo5 = connection.getRepository(TagType);
    await repo5.save(tagType5);

    const tagType6 = new TagType();
    tagType6.name = 'Business';
    tagType6.slug = 'business';
    const repo6 = connection.getRepository(TagType);
    await repo6.save(tagType6);

    const tagType7 = new TagType();
    tagType7.name = 'Place';
    tagType7.slug = 'place';
    const repo7 = connection.getRepository(TagType);
    await repo7.save(tagType7);

    const tagType8 = new TagType();
    tagType8.name = 'Location';
    tagType8.slug = 'location';
    const repo8 = connection.getRepository(TagType);
    await repo8.save(tagType8);

    const tagType9 = new TagType();
    tagType9.name = 'Event';
    tagType9.slug = 'event';
    const repo9 = connection.getRepository(TagType);
    await repo9.save(tagType9);
  }
}
