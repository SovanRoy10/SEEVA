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
      <div className="p-0 mb-6">
        <p className="block  text-base antialiased  leading-relaxed text-gray-600">
          "{props.message.message}"
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
