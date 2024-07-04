export default function Check({ data }: { data: any }) {
  return (
    <div className="flex w-full flex-col items-center gap-10 p-10">
      {JSON.stringify(data.data)}
    </div>
  );
}
