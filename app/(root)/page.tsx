import { DragAndDrop } from '@/components/shared/DragAndDrop';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';


export default async function Home() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <DragAndDrop userId={user.id} />
    </>
  );
};
