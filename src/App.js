import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import styled from 'styled-components'
import ThaiIcon from '../src/Assets/thailand.png'
import UsIcon from '../src/Assets/united-states.png'
import LaosIcon from '../src/Assets/laos.png'
import {
  Modal,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Button,
  DatePicker,
  Divider,
  Table,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const App = () => {
  const [data, setData] = useState([])
  const [selectRows, setSelectRow] = useState([])
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [prefix, setPrefix] = useState('')
  const [nationality, setNationality] = useState('')
  const [taskId, setTaskId] = useState('')

  const dateFormat = 'DD/MM/YYYY';
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    const localData = localStorage.getItem('local-data')
    console.log('Local-Storage-Data:', JSON.parse(localData))
    if (localData !== null) {
      setData(JSON.parse(localData))
    }
  }, [])

  const onFinish = (values) => {
    let list = [...data, values]
    const newData = list.map((x, i) => {
      x.id = i + 1
      return x
    })
    localStorage.clear();
    setData(newData)
    localStorage.setItem('local-data', JSON.stringify(newData))
    window.location.reload()
  }

  const columns = [
    {
      width: 100,
      title: 'ID',
      dataIndex: 'id',
      render: (text, record) => (
        <span>{record.id ? record.id : '-'}</span>
      ),
    },
    {
      width: 300,
      title: 'Name',
      dataIndex: 'firstName',
      render: (text, record) => (
        <span>{record.title}{' '}{record.firstName}{' '}{record.lastName}</span>
      ),
    },
    {
      width: 300,
      title: 'Gender',
      dataIndex: 'gender',
      render: (text, record) => (
        <span>{record.gender ? record.gender : '-'}</span>
      ),
    },
    {
      width: 300,
      title: 'Mobile Phone',
      dataIndex: 'mobilePhone',
      render: (text, record) => (
        <>{record.prefix && record.mobilePhone ? <span>{record.prefix + record.mobilePhone}</span> : '-'}</>
      ),
    },
    {
      width: 300,
      title: 'Nationality',
      dataIndex: 'nationality',
      render: (text, record) => (
        <span>{record.nationality ? record.nationality : '-'}</span>
      ),
    },
    {
      width: 300,
      title: 'Action',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            icon={(<EditOutlined />)}
            style={{ width: '48px', height: '48px', marginRight: '0.5em' }}
            onClick={() => {
              showEditModal(record.id, record.title, record.firstName, record.lastName, record.nationality, record.gender, record.mobilePhone, record.prefix)
            }} />
          <Button
            icon={(<DeleteOutlined />)}
            style={{ width: '48px', height: '48px', marginLeft: '0.5em' }}
            onClick={() => { confirmRemove(record.id) }} />
        </>
      ),
    },
  ];

  const confirmEdit = () => {
    const { confirm } = Modal
    confirm({
      title: 'Confirm Edit',
      content: 'Are you sure to edit this task?',
      okText: 'Yes',
      okButtonProps: {
        type: 'danger',
        text: 'Yes',
        style: { height: '40px', width: '65px' },
      },
      cancelButtonProps: {
        style: { height: '40px', width: '65px' },
      },
      cancelText: 'No',
      onOk() {
        editTask()
      },
    })
  }

  const editTask = () => {
    const newData = data.map(item =>
      item.id === taskId ? {
        ...item,
        title: title,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        prefix: prefix,
        mobilePhone: mobilePhone,
        nationality: nationality
      } : item
    );
    localStorage.clear();
    setData(newData)
    localStorage.setItem('local-data', JSON.stringify(newData))
    cancelEditModal()
    window.location.reload()
  }

  const confirmRemove = (taskId) => {
    const { confirm } = Modal
    confirm({
      centered: true,
      title: `Confirm Remove Task ID : ${taskId}`,
      content: 'Are you sure remove this task?',
      okText: 'Yes',
      okButtonProps: {
        type: 'danger',
        text: 'Yes',
        style: { height: '40px', width: '65px' },
      },
      cancelButtonProps: {
        style: { height: '40px', width: '65px' },
      },
      cancelText: 'No',
      onOk() {
        removeTask(taskId)
      },
    })
  }

  const removeRowSelected = () => {
    for (var i = 0; i < selectRows.length; i++) {
      data.splice(data.findIndex((item) => item.id == selectRows[i].id), 1)
    }
    localStorage.clear();
    setData(data)
    localStorage.setItem('local-data', JSON.stringify(data))
    window.location.reload()
  }

  const removeTask = (taskId) => {
    const newData = data.filter((i) => {
      return i.id !== taskId
    })
    localStorage.clear();
    setData(newData)
    localStorage.setItem('local-data', JSON.stringify(newData))
    window.location.reload()
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRow(selectedRows)
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const showEditModal = (taskId, title, firstName, lastName, nationality, gender, mobilePhone, prefix) => {
    setTaskId(taskId)
    setTitle(title)
    setFirstName(firstName)
    setLastName(lastName)
    setNationality(nationality)
    setGender(gender)
    setMobilePhone(mobilePhone)
    setPrefix(prefix)
    setVisible(true);
  };

  const cancelEditModal = () => {
    setVisible(false);
  };

  const hasSelected = selectRows.length > 0;
  const hasData = data !== null && data.length > 0;
  return (
    <>
      <Modal
        title={`Edit Task ID : ${taskId}`}
        visible={visible}
        onOk={() => { confirmEdit() }}
        onCancel={cancelEditModal}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            Title:
              <Select
              defaultValue={title}
              style={{ width: '100%' }}
              onSelect={(e) => { setTitle(e) }}>
              <Option value='Mr.'>Mr.</Option>
              <Option value='Mrs.'>Mrs.</Option>
              <Option value='Miss'>Miss</Option>
              <Option value='Ms.'>Ms.</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            First Name:
              <Input
              defaultValue={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
              type="text"
              block="true"
              allowClear
            />
          </Col>
          <Col span={12}>
            Last Name:
              <Input
              defaultValue={lastName}
              onChange={(e) => { setLastName(e.target.value) }}
              type="text"
              block="true"
              allowClear
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            Nationality:
              <Select
              defaultValue={nationality}
              onSelect={(e) => { setNationality(e) }}
              style={{ width: '100%' }}>
              <Option value='THAI'>THAI</Option>
              <Option value='AMERICAN'>AMERICAN</Option>
              <Option value='LAOS'>LAOS</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            Gender:
              <Radio.Group
              defaultValue={gender}
              onChange={(e) => { setGender(e.target.value) }}
              style={{ paddingLeft: '1rem' }}>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Unisex">Unisex</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={14}>
            Mobile Phone:
              <Input
              defaultValue={mobilePhone}
              onChange={(e) => { setMobilePhone(e.target.value) }}
              type="number"
              allowClear />
          </Col>
          <Col span={10}>
            Country Code:
              <Select
              defaultValue={prefix}
              onChange={(e) => { setPrefix(e) }}
              style={{ width: '100%' }}>
              <Option value="+66"><div><img src={ThaiIcon} alt="thai_icon" width="14" height="auto" />{' '}<span>+66</span></div></Option>
              <Option value="+1"><div><img src={UsIcon} alt="us_icon" width="14" height="auto" />{' '}<span>+1</span></div></Option>
              <Option value="+856"><div><img src={LaosIcon} alt="laos_icon" width="14" height="auto" />{' '}<span>+856</span></div></Option>
            </Select>
          </Col>
        </Row>
      </Modal>
      <div style={{ margin: '2rem' }}>
        <CardStyled>
          <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={data}>
            <Row gutter={[16, 4]}>
              <Col span={6}>
                <Form.Item
                  name="title"
                  label={(<strong>Title</strong>)}
                  rules={[{ required: true, message: 'Title is required' }]}>
                  <Select placeholder="-- Please Select --">
                    <Option value='Mr.'>Mr.</Option>
                    <Option value='Mrs.'>Mrs.</Option>
                    <Option value='Miss'>Miss</Option>
                    <Option value='Ms.'>Ms.</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  name="firstName"
                  label={(<strong>First Name</strong>)}
                  rules={[{ required: true, message: 'First Name required' }]}>
                  <Input
                    type="text"
                    block="true"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  name="lastName"
                  label={(<strong>Last Name</strong>)}
                  rules={[{ required: true, message: 'Last Name is required' }]}>
                  <Input
                    type="text"
                    block="true"
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 4]}>
              <Col span={12}>
                <Form.Item
                  label={(<strong>Birthdate</strong>)}
                  name="birthdate"
                  rules={[{ required: true, message: 'Birthdate is required' }]}>
                  <DatePicker style={{ width: '100%' }} format={dateFormat} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nationality"
                  label={(<strong>Nationality</strong>)}
                  rules={[{ required: true, message: 'Nationality is required' }]}>
                  <Select placeholder="-- Please Select --">
                    <Option value='THAI'>THAI</Option>
                    <Option value='AMERICAN'>AMERICAN</Option>
                    <Option value='LAOS'>LAOS</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 4]}>
              <Col span={16}>
                <Form.Item
                  name="citizen"
                  label={(<strong>Citizen ID</strong>)}
                  rules={[{ required: true, message: 'Citizen ID is required' }]}>
                  <Input
                    maxLength={13}
                    type="number"
                    style={{ width: '100%' }}
                    allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 4]}>
              <Col>
                <Form.Item
                  name="gender"
                  label={(<strong>Gender</strong>)}
                  rules={[{ required: true, message: 'Gender is required' }]}>
                  <Radio.Group style={{ paddingLeft: '1rem' }}>
                    <Radio style={{ width: 150 }} value="Male">Male</Radio>
                    <Radio style={{ width: 150 }} value="Female">Female</Radio>
                    <Radio style={{ width: 150 }} value="Unisex">Unisex</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 4]}>
              <Col span={12}>
                <Form.Item name="mobilePhone"
                  label={(<strong>Mobile Phone</strong>)}
                  rules={[{ required: true, message: 'Mobile Phone is required' }]}>
                  <Input type="number" allowClear />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="prefix"
                  rules={[{ required: true, message: 'Country Code is required' }]}>
                  <Select placeholder="-- Country Code --">
                    <Option value="+66"><div><img src={ThaiIcon} alt="thai_icon" width="14" height="auto" />{' '}<span>+66</span></div></Option>
                    <Option value="+1"><div><img src={UsIcon} alt="us_icon" width="14" height="auto" />{' '}<span>+1</span></div></Option>
                    <Option value="+856"><div><img src={LaosIcon} alt="laos_icon" width="14" height="auto" />{' '}<span>+856</span></div></Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 4]}>
              <Col span={12}>
                <Form.Item
                  name="passportNo"
                  label={(<strong >Passport No</strong>)}
                  rules={[{ required: true, message: 'Passport No is required' }]}>
                  <Input allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 4]}>
              <Col span={12}>
                <Form.Item
                  name="expectedSalary"
                  label={(<strong>Expected Salary</strong>)}
                  rules={[{ required: true, message: 'Expected Salary is required' }]}>
                  <Input
                    placeholder="I want salary 50,000"
                    type="number"
                    prefix="฿"
                    suffix="THB" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Button
                    style={{ width: '50%', float: "right" }}
                    type="primary"
                    htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </CardStyled>
        <Divider style={{ marginTop: '2rem' }} />
        {hasData &&
          <div style={{
            left: 0,
            zIndex: 1,
            paddingTop: '1rem',
            paddingLeft: '2rem',
            position: 'absolute',
            alignContent: 'center'
          }}>
            <Button
              type="danger"
              disabled={!hasSelected}
              onClick={() => { removeRowSelected() }}>
              Delete
              </Button>
          </div>}
        <Table
          rowKey="id"
          columns={columns}
          scroll={{ x: 1000 }}
          rowSelection={rowSelection}
          dataSource={data}
          pagination={{ position: ['topRight'] }}>
        </Table>
      </div>
      <br />
      <footer style={{ textAlign: "center" }}>
        <h3>Developed by Mr.ADITHEP SUDCHAREE</h3>
      </footer>

    </>
  );
}

export default App;

const CardStyled = styled(Card)`
&&.ant-card {
  border-radius: .85rem;
}
.ant-card-body {
  border-radius: .85rem;
  box-shadow: 0px 5px 6px -1px rgba(0,0,0,0.10);
  padding-bottom: 0;
}
`
