import { Button } from "react-bootstrap"

export const SubmitBtn = ({disabled = false, icon = 'fa-save', label = 'Save'}) => {
    return <Button variant="dark" type="submit" disabled={disabled}>
        <i className={`fa-solid ${disabled ? 'fa-spinner fa-spin' : icon} me-2`}></i>{label}
    </Button>
}