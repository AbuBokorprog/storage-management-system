import { File } from '../files/files.model';
import { User } from '../users/users.model';

const dashboardSummary = async (userId: string) => {
  const user = await User.findById(userId);

  const totalNote = await File.find({
    userId: userId,
    type:
      'application/msword' ||
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const totalPDF = await File.find({
    userId: userId,
    type: 'application/pdf',
  });

  const totalImage = await File.find({
    userId,

    type: { $regex: 'image' },
  });

  const recentFiles = await File.find({
    userId: userId,
  })
    .limit(10)
    .sort({ createdAt: -1 });

  return {
    totalStorage: user?.maxStorage,
    usedStorage: user?.storageUsed,
    totalPDF: totalPDF?.length,
    totalImage: totalImage?.length,
    totalNote: totalNote.length,
    recentFiles,
  };
};

export const dashboardService = { dashboardSummary };
