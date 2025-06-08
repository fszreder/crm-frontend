import { Card, CardContent } from '@/components/ui/card';
import { CustomerFormFields } from '@/components/customerform/CustomerFormFields';
import { useCustomerForm } from '@/hooks/useCustomerForm';
import { motion } from 'framer-motion';

const CustomerForm = () => {
    const { formData, isEditing, handleChange, handleSubmit, handleCancel } = useCustomerForm();

    return (
        <motion.div
            className="p-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-6 max-w-xl mx-auto">
                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditing ? 'Edytuj klienta' : 'Dodaj klienta'}
                        </h2>
                        <CustomerFormFields
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            isEditing={isEditing}
                        />
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};

export default CustomerForm;
