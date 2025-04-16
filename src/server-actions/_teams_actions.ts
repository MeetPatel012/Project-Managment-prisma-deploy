"use server"

import prisma from "@/lib/prisma";

export async function getTeams() {
  try {
    const teams = await prisma.team.findMany();
    
    const teamsWithUsers = await Promise.all(
      teams.map(async (team) => {
        const productOwner = team.productOwnerUserId 
          ? await prisma.user.findUnique({
              where: { userId: team.productOwnerUserId },
              select: { username: true }
            })
          : null;

        const projectManager = team.projectManagerUserId
          ? await prisma.user.findUnique({
              where: { userId: team.projectManagerUserId },
              select: { username: true }
            })
          : null;

        return {
          id: team.id,
          teamName: team.teamName,
          productOwnerUsername: productOwner?.username || 'Not Assigned',
          projectManagerUsername: projectManager?.username || 'Not Assigned'
        };
      })
    );

    return teamsWithUsers;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw new Error('Failed to fetch teams');
  }
}