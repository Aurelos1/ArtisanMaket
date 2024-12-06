const ModifyButton = ({onModify}) => {
    return (
        <button onClick={onModify} className="btn btn-primary btn-sm">Modify</button>
    );
};

export default ModifyButton;