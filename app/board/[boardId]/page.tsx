import { Room } from "@/components/room";

import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";
import { Editor } from "./_components/code-editor/editor";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
      <Editor />
    </Room>
  );
};

export default BoardIdPage;