const GameDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return <div>Game Detail: {id}</div>;
};

export default GameDetailPage;
