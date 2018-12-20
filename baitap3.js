const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }))
const users = [
	{
		id: 1,
		email: 'user1@gamil.com',
		password: 'abc123',
		gender: 'male'
	},
	{
		id: 2,
		email: 'user2@gamil.com',
		password: '123abc',
		gender: 'female'
	}
];
writeFileSync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        const content = JSON.stringify(data);
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}
readFileSync = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            const fileContent = JSON.parse(data);
            return resolve(fileContent);
        });
    });
}
app.get('/users/:userId', async (req, res) => {
    try {
        const users = await readFileSync('data/users.json');
        const userId = 1*(req.params.userId);
        for (const item of users){
            if (item.id === userId) {
                return res.status(200).json({ user: item });
            }
        }
        return res.status(400).json({ message: 'User is not found' });
    } catch (error) {
        return res.status(400).json({ message: 'Cannot read user file', error: error.message });
    }
});
app.get('/users/write', async  (req, res) => {
    try {
        await writeFileSync('data/users.json', users);
        return res.status(200).json({ message: 'Succesful' });
        
    } catch (error) {
        return res.status(417).json({ message: 'Cannot write file!', error: error.message });
    }

});
app.get('/users/read', async  (req, res) =>{
    try {
        const data = await readFileSync('data/users.json');
    } catch (error) {
        return res.status(400).json({ message: 'Cannot read user file', error: error.message });
    }
});
app.post('/users/post', async (req, res) => {
    try {
        const body = req.body;
        if (!body.id){
            return res.status(400).json({ error: 'id is required field'});
        }
        if (!body.name) {
			return res.status(400).json({ error: 'name is required field'});
        }
        const users = await readFileSync('data/users.json');
        const newUser = {
            id: body.id,
            name: body.name,
            password: body.password,
            gender: body.gender,
            createdAt: new Date()
        };
        for (const item of users) {
            if (item.id === 1*newUser.id) {
                return res.status(400).json({ error: 'User is existed' });
            }
        }
        users.push(newUser);
        await writeFileSync('data/users.json', users);
        return res.json({ message: 'Create new user successfuly', user: newUser });

    } catch (error) {
        return res.status(400).json({ message: 'Cannot read user file', error: error.message });
    }
});
getIndexOfUserById = (users, id) => {
    item  = 0;
    users.array.forEach(element => {
        if(users.id === id) {
            return item;
        }
        ++item;
    });
}
app.delete('/users/delete/:id', async (req, res) => {
    try {
        const userId = 1*(req.params.id);
        if (!userId) {
			return res.status(400).json({ error: 'id is required field'});
        }
        const users = await readFileSync('data/users.json');
        let index = getIndexOfUserById(users, userId);
        if (index !== undefined) {
            users.splice(index, 1);
            await writeFileSync('data/users.json', users);
            return res.json({ message: 'Delete user successfuly' });
        }
        return res.json({ message: 'Not found user to delete' });

    } catch (error) {
        return res.status(400).json({ message: 'Cannot delete', error: error.message });
    }

});
app.post('/users/update/:id', async (req,res) => {
    try {
        const userId = 1*(req.params.id);
        if (!userId) {
			return res.status(400).json({ error: 'id is required field'});
        }
        const users = await readFileSync('data/users.json');
        let index = getIndexOfUserById(users, userId);
        userUpDate = {
            id: body.id,
            name: body.name,
            password: body.password,
            gender: body.gender,
            createUpday: new Date()
        };
        if (index !== undefined) {
            users[index] = userUpDate;
            await writeFileSync('data/users.json', users);
            return res.json({ message: 'upday thanh cong' });
        }
        users.push(userUpDate);
        await writeFileSync('data/users.json', users);
        return res.json({ message: 'upday thanh cong' });
    } catch (error) {
        return res.status(400).json({ message: 'Cannot update', error: error.message });
    }

});
app.get('/users/search/:name', async (req,res) =>{
    try {
        const userName = req.params.name;
        for(let i = 0; i < users.length; i++){
            if (users[i].name === userName){
                return res.json({user : i});
            }
        }
        return res.status(400).json({ message: 'User is not found' });
    } catch (error) {
        return res.status(400).json({ message: 'Cannot read user file', error: error.message });
    }
});
app.get('/users/search/regex/:name', async (req,res) =>{
    try {
        const userName = req.params.name;
        for(let i = 0; i < users.length; i++){
            if (users[i].name === userName){
                res.json({user : i});
            }
        }
        return res.status(400).json({ message: 'User is not found' });
    } catch (error) {
        return res.status(400).json({ message: 'Cannot read user file', error: error.message });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



