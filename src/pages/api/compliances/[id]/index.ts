import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { complianceValidationSchema } from 'validationSchema/compliances';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.compliance
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getComplianceById();
    case 'PUT':
      return updateComplianceById();
    case 'DELETE':
      return deleteComplianceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getComplianceById() {
    const data = await prisma.compliance.findFirst(convertQueryToPrismaUtil(req.query, 'compliance'));
    return res.status(200).json(data);
  }

  async function updateComplianceById() {
    await complianceValidationSchema.validate(req.body);
    const data = await prisma.compliance.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteComplianceById() {
    const data = await prisma.compliance.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
