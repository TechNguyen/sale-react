import useRequest from './useRequest'


const useFirmware = () => {
	const { createGetRequest, createPostRequest, cancel } = useRequest('firmwares')


	const getFirms = () => createGetRequest({
		endpoint: '',
	})
	const createFirm = ({ ID, Name, Data, locallink, Description }) => createPostRequest({
		endpoint: 'create',
		data: {  ID, Name, Data, locallink ,Description }
	})
	const deleteFirm = (ID) => createPostRequest({
		endpoint: 'delete',
		data: ID
	})

	const deleteManyFirms = ({selectedRowKeys}) => createPostRequest({
		endpoint: 'deletes',
		data: selectedRowKeys
	})

	const updateFirm = ({ID, Name, Data, LocalLink ,Description }) => createPostRequest({
		endpoint: 'update',
		data: {ID, Name, Data, LocalLink ,Description }
	})

	const uploadFile = (formData) => createPostRequest({
		endpoint: 'upload',
		data: formData
	})
	return {
		getFirms,
		createFirm,
		deleteFirm,
		deleteManyFirms,
		updateFirm,
		uploadFile,
		cancel
	}
}


export default useFirmware
