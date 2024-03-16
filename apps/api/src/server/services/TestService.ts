import { BaseService, type Resources } from './Service';
import { user } from '../../models/schema';
import { gte } from 'drizzle-orm';


export class TestService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/');

    this.router.get('/test', async (req, res) => {
      const results = await this.resources.db
        .select()
        .from(user)
        .where(gte(user.id, 1));

      res.status(200).json({
        results,
      });
    });
  }
}
