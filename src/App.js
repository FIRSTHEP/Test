import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import mockData from '../src/mockData'
import mockTableData from '../src/mockTableData'
import styled from 'styled-components'
import ThaiIcon from '../src/Assets/thailand.png'
import UsIcon from '../src/Assets/united-states.png'
import LaosIcon from '../src/Assets/laos.png'
import {
  Card,
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  DatePicker,
  message,
  Divider,
  Table
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const App = () => {
  const [data, setData] = useState([])
  const [form] = Form.useForm();
  const { Option } = Select;
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    localStorage.setItem('user-data', JSON.stringify(data))
  }, [])

  const onFinish = (values) => {
    setData([...data, values])
  }

  const columns = [
    {
      width: 300,
      title: 'Name',
      dataIndex: 'firstName',
      render: (text, record) => (
        <>
          <span>{record.firstName}{' '}{record.lastName}</span>
        </>
      ),
    },
    {
      width: 300,
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      width: 300,
      title: 'Mobile Phone',
      dataIndex: 'mobilePhone',
    },
    {
      width: 300,
      title: 'Nationality',
      dataIndex: 'nationality',
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
            onClick={() => { }}
          />
          <Button
            icon={(<DeleteOutlined />)}
            style={{ width: '48px', height: '48px', marginLeft: '0.5em' }}
            onClick={() => { }}
          />
        </>
      ),
    },
  ];

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }} defaultValue="66">
        <Option value="66"><div><img src={ThaiIcon} alt="thai_icon" width="14" height="auto"/>{' '}<span>+66</span></div></Option>
        <Option value="1"><div><img src={UsIcon} alt="us_icon" width="14" height="auto"/>{' '}<span>+1</span></div></Option>
        <Option value="856"><div><img src={LaosIcon} alt="laos_icon" width="14" height="auto"/>{' '}<span>+856</span></div></Option>
      </Select>
    </Form.Item>
  );

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRows)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;
  const hasData = data.length > 0;

  return (
    <>
      <div style={{ margin: '2rem' }}>
        <CardStyled>
          <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={mockData.data}>

            <Row gutter={[16, 4]}>
              <Col span={4}>
                <Form.Item
                  name="title"
                  label={(<strong>Title</strong>)}
                  rules={[{ required: true, message: 'Title is required' }]}>
                  <Select>
                    <Option value='Mr.'>Mr.</Option>
                    <Option value='Mrs.'>Mrs.</Option>
                    <Option value='Miss'>Miss</Option>
                    <Option value='Ms.'>Ms.</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="firstName"
                  label={(<strong>First Name</strong>)}
                  rules={[{ required: true, message: 'First Nameis required' }]}>
                  <Input
                    type="text"
                    block="true"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
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
                  label={(<strong>Nationality</strong>)}>
                  <Select>
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
                  style={{ paddingLeft: '.5rem' }}
                  name="citizen"
                  label={(<strong>Citizen ID</strong>)}>
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
                  style={{ paddingLeft: '.5rem' }}
                  name="gender"
                  label={(<strong>Gender</strong>)}>
                  <Radio.Group style={{ paddingLeft: '1rem' }}>
                    <Radio style={{ width: 150}} value="male">Male</Radio>
                    <Radio style={{ width: 150}}  value="female">Female</Radio>
                    <Radio style={{ width: 150}}  value="unisex">Unisex</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 4]}>
              <Col span={10}>
                <Form.Item name="mobilePhone"
                  label={(<strong>Mobile Phone</strong>)}
                  rules={[{ required: true, message: 'Mobile Phone is required' }]}>
                  <Input
                    type="number"
                    addonBefore={prefixSelector}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 4]}>
              <Col span={10}>
                <Form.Item
                  style={{ paddingLeft: '.5rem' }}
                  name="passportNo"
                  label={(<strong >Passport No</strong>)}>
                  <Input
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 4]}>
            <Col span={10}>
                <Form.Item
                  name="expectedSalary"
                  label={(<strong>Expected Salary</strong>)}
                  rules={[{ required: true, message: 'Expected Salary is required' }]}>
                  <Input
                    prefix="฿"
                    suffix="THB" />
                </Form.Item>
              </Col>
              <Col span={14}>
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

        <Divider style={{ marginTop: '1.5rem' }} />

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
              disabled={!hasSelected}>
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
        <br />

      </div>
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
