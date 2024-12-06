const DeleteButton = ({onDelete}) => {
    return (
        <button onClick={onDelete} className="btn btn-danger btn-sm">Delete</button>

    );
};

export default DeleteButton;
