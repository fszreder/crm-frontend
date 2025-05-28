import { Card, CardContent } from '@/components/ui/card';
import { CustomerFormFields } from '@/components/customerform/CustomerFormFields';
import { useCustomerForm } from '@/hooks/useCustomerForm';

const CustomerForm = () => {
    const { formData, isEditing, handleChange, handleSubmit, handleCancel } = useCustomerForm();

    return (
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
    );
};

export default CustomerForm;
