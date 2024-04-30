export default function BlogCard() {
  return (
    <div className="max-w-sm lg:max-w-full lg:flex h-60">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS25GV-N6pGwDIns71mhCCIDEEMw0o7sfxnIAqTyfvEZbg_tFgY"
        alt=""
        className="object-cover w-1/3"
      />
      <div className="overflow-hidden border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold mb-2">
            Can coffee make you a better developer?
          </div>
          <p className="text-gray-700 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS25GV-N6pGwDIns71mhCCIDEEMw0o7sfxnIAqTyfvEZbg_tFgY"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
}
