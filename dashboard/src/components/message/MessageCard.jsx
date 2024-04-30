const MessageCard = (props) => {
  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl  text-black shadow-none bg-white px-5">
      <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-black  shadow-none rounded-xl">
        <img
          src="/images/default.png"
          alt={props.message.firstName}
          className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <h5 className="block  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {props.message.firstName} {props.message.lastName}
            </h5>
            <div className="flex items-center gap-0 5">
              {new Date(props.message.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
          <p className="block text-blue-gray-900">{props.message.email}</p>
        </div>
      </div>
      <div className="p-0 mb-6 flex justify-between items-center">
        <p className="block  text-base antialiased  leading-relaxed text-gray-600">
          "{props.message.message}"
        </p>
        <button
          onClick={() => props.handleDeleteMessage(props.message._id)}
          className="bg-red-200 p-2 rounded-full m-2 w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-red-600"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
