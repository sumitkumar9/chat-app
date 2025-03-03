import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }: { open: boolean, handleClose:() => void, deleteHandler: () => void }) => {
  return (
    <Dialog open={open}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this group?
            </DialogContentText>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="primary">
                Cancel
                </Button>
                <Button onClick={deleteHandler} variant="contained" color="error">
                Delete
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmDeleteDialog