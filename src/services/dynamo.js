const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                id_client: ID
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }
        console.log(data);

        return data.Item;
    },

    insert: async ({ data, tableName }) => {
        const params = {
            TableName: tableName,
            Item: data
        };

        return documentClient.put(params).promise();

        
    },

    update: async ({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) => {
        const params = {
            TableName: tableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            },
        };

        return documentClient.update(params).promise();
    },

    query: async ({ tableName, queryKey, queryValue }) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },

    queryIndex: async ({ tableName, index, queryKey, queryValue }) => {
        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
            ScanIndexForward: false,
            // Limit: 1
        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },

    
    queryRealTime: async ({ tableName, queryKey, queryValue }) => {
        const params = {
            TableName: tableName,
            // IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
            Limit: 1,
            ScanIndexForward: false,

        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },

    queryRealTimeByKey: async ({ tableName, queryKey, queryValue }) => {
        const params = {
            TableName: tableName,
            // IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
            Limit: 1,
            ScanIndexForward: false,

        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },

    queryWithFilter: async ({ tableName, queryKey, queryValue, phase }) => {
        const params = {
            TableName: tableName,
            // IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            FilterExpression: "#phase = :phase",
            ExpressionAttributeNames: {
                '#phase': 'phase',
            },
            ExpressionAttributeValues: {
                ':hkey': queryValue,
                ':phase': phase
            },
            Limit: 1,
            ScanIndexForward: false,

        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },

    queryTime: async ({ tableName, queryKey, queryValue, startDate, endDate }) => {
        const params = {
            TableName: tableName,
            // IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey and #my_time between :startDate and :endDate`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
                ':startDate': startDate,
                ':endDate': endDate,
            },
            ExpressionAttributeNames: { "#my_time": "time" }
        };

        const res = await documentClient.query(params).promise();

        return res.Items || [];
    },

    
};
module.exports = Dynamo;