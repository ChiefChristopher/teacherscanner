// test-models.ts
import dbConnect from './lib/db';
import { Classroom } from './lib/models/classroom';
import { Student } from './lib/models/student';
import { User } from './lib/models/user';

async function test() {
  await dbConnect();

  const owner = await User.create({
    email: 'owner@example.com',
    passwordHash: 'fakehash',
    subscriptionTier: 'free',
  });

  const classroom = await Classroom.create({
    name: 'Room 12 - Special Ed',
    qrCodeToken: 'qr-token-abc123',
    owner: owner._id,
  });

  await Student.create({
    firstName: 'Alex',
    lastName: 'Smith',
    classroom: classroom._id,
    iepGoals: 'Improve reading fluency',
  });

  console.log('Created:', { owner, classroom });
}

test().catch(console.error);
