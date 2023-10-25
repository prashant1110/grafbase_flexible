import Modal from "@/components/Modal"
import ProjectForm from "@/components/ProjectForm"

const CreateProject = () => {
  return (
    <div>
      <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>

        <ProjectForm/>
      </Modal>
      
    </div>
  )
}

export default CreateProject
