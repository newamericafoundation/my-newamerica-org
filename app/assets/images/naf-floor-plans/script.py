# Utility script transforming floorplans drawn and annotated in Rhinoceros 3d into the JSON format used by React to render interactive floor plans in the browser.

import math
import string
import json
import decimal
import rhinoscriptsyntax as rs

# Returns polyline coordinates, assuming it is closed.
#   (last coordinate is deleted)
def get_closed_polyline_coordinates(polyline):
	coordinates = []
	pts = rs.CurvePoints(polyline)
	for pt in pts:
		x = float('%.4f' % pt[0])
		y = float('%.4f' % pt[1])
		coordinates.append([ x, y ])
	del coordinates[-1]
	return coordinates

def get_rooms(base_layer):
	rooms = []
	layer_name = base_layer + '::rooms'
	geometry = rs.ObjectsByLayer(layer_name)
	for item in geometry:
		room_id = rs.ObjectName(item)
		split_room_id = room_id.split('--')
		number = split_room_id[0]
		name = None
		capacity = None
		if (len(split_room_id) > 1):
			name = split_room_id[1]
		if (len(split_room_id) > 2):
			capacity = int(split_room_id[2])
		room = {
			'id': room_id,
			'number': number,
			'name': name,
			'capacity': capacity,
			'coordinates': get_closed_polyline_coordinates(item)
		}
		rooms.append(room)
	return rooms

def get_balcony_coordinates(base_layer):
	layer_name = base_layer + '::balcony'
	if rs.IsLayer(layer_name):
		balcony = rs.ObjectsByLayer(layer_name)[0]
		return get_closed_polyline_coordinates(balcony)

# Get outer wall coordinates for a base layer.
def get_outer_wall_coordinates(base_layer):
	layer_name = base_layer + '::outer_wall'
	outer_wall = rs.ObjectsByLayer(layer_name)[0]

	return get_closed_polyline_coordinates(outer_wall)

# Get a single floor.
def get_floor(base_layer):
	split_base_layer = base_layer.split('--')
	return {
		"id": split_base_layer[0],
		"name": split_base_layer[1],
		"outer_wall_coordinates": get_outer_wall_coordinates(base_layer),
		"balcony_coordinates": get_balcony_coordinates(base_layer),
		"rooms": get_rooms(base_layer)
	}

# Get all floors.
def get_floors(base_layers):
	res = []
	for base_layer in base_layers:
		res.append(get_floor(base_layer))
	return res

# Write a file in the folder of the current model.
#   - file_name includes extension.
def write_file(file_name, content):
	path = rs.DocumentPath()
	name = rs.DocumentName()
	path = path + "/" + file_name
	f = open(path, "w")
	f.write(content)
	f.close()

def Main():
	# Layer names are built up by concatenating floor id and floor name using -- as a separator.
	floors = [
		'dc_08--8th Floor, Washington, DC', 
		'dc_09--9th Floor, Washington, DC', 
		'dc_10--10th Floor, Washington, DC', 
		'dc_11--11th Floor, Washington, DC'
	]
	write_file('exp.json', json.dumps(get_floors(floors)))

Main()