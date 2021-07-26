import NotificationIcon from '../../../assets/svg/notification-icon.svg';

const UserrNotification = () => {
  return (
    <div className="mr-11 flex items-center">
      <button
        type="button"
        className="focus:outline-none text-black hover:text-blue-500"
      >
        <NotificationIcon className="stroke-current hover:stroke-current" />
      </button>
    </div>
  );
};
export default UserrNotification;
