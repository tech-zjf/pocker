import useSocket from '@/libs/hooks/use-socket';
import { Form, Input, Modal } from 'antd';

export interface CreateRoomModalProps {
    open: boolean;
    onClose: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = (props) => {
    const { open, onClose } = props;
    const [form] = Form.useForm();
    const { socket } = useSocket();

    /** 创建房间 */
    const createRoom = async () => {
        try {
            await form.validateFields();
            const formData = await form.getFieldsValue();
            const createRoomParams = {
                ...formData,
                maxPlayers: +formData.maxPlayers
            };
            socket.emit('createRoom', createRoomParams, () => {
                _onCancel();
            });
        } catch (error) {}
    };

    const _onCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal destroyOnClose title="创建房间" width={600} open={open} okText="确定" cancelText="取消" onOk={createRoom} onCancel={_onCancel}>
            <Form form={form} name="basic" layout="vertical" initialValues={{ maxPlayers: 3 }} autoComplete="off" className=" mt-6">
                <Form.Item
                    label="房间名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入房间名!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="房间人数上限"
                    name="maxPlayers"
                    rules={[
                        {
                            required: true,
                            message: '请输入人数上限!'
                        }
                    ]}
                >
                    <Input type="number" max={8} min={3} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CreateRoomModal;
