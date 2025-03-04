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
    type:
      'image/png' ||
      'image/svg+xml' ||
      'image/webp' ||
      'image/gif' ||
      'image/jpeg',
  });

  return {
    totalStorage: user?.maxStorage,
    usedStorage: user?.storageUsed,
    totalPDF: totalPDF?.length,
    totalImage: totalImage?.length,
    totalNote: totalNote.length,
  };
};

export const dashboardService = { dashboardSummary };
